use tauri::{Emitter, EventTarget, Manager};

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

#[derive(Clone, serde::Serialize)]
struct Scripture {
    verse: String,
    message: String,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_display_window(app: tauri::AppHandle) {
    let file_path = "../../extra-windows/display.html";
    let _display_window =
        tauri::WebviewWindowBuilder::new(&app, "display", tauri::WebviewUrl::App(file_path.into()))
            .title("Display")
            .build()
            .unwrap();
}

#[tauri::command]
async fn send_message_to_display(app: tauri::AppHandle, message: String) {
    let display_window = app.get_webview_window("display").unwrap();
    display_window
        .emit_to(
            EventTarget::webview_window("display"),
            "message",
            Payload { message },
        )
        .unwrap();
}

#[tauri::command]
async fn show_scripture(app: tauri::AppHandle, verse: String, message: String) {
    println!("Here is the message and scripture {verse} {message}");
    let display_window = app.get_webview_window("display").unwrap();
    display_window
        .emit_to(
            EventTarget::webview_window("display"),
            "show_scripture",
            Scripture { verse, message },
        )
        .unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            open_display_window,
            send_message_to_display,
            show_scripture
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
