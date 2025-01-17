use tauri::{Emitter, EventTarget, Manager};

// the Scripture type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Scripture {
    verse: String,
    message: String,
}

fn create_display_window(app: &tauri::AppHandle) -> tauri::WebviewWindow {
    let file_path = "../../extra-windows/display.html";
    let display_window =
        tauri::WebviewWindowBuilder::new(app, "display", tauri::WebviewUrl::App(file_path.into()))
            .title("Display")
            .build()
            .unwrap();
    display_window
}

fn create_display_window_if_nonexistent(app: &tauri::AppHandle) -> tauri::WebviewWindow {
    match app.get_webview_window("display") {
        Some(display_window) => display_window,
        None => create_display_window(app),
    }
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_display_window(app: tauri::AppHandle) {
    create_display_window_if_nonexistent(&app);
}



#[tauri::command]
async fn show_scripture(app: tauri::AppHandle, verse: String, message: String) {
    let display_window = create_display_window_if_nonexistent(&app);
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
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            open_display_window,
            show_scripture,
 
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
