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
            .title("Scripture Spotter (Display)")
            .inner_size(800f64, 600f64)
            .visible(true)
            .build()
            .unwrap();
    display_window
}

fn get_or_create_display_window(app: &tauri::AppHandle) -> tauri::WebviewWindow {
    match app.get_webview_window("display") {
        Some(display_window) => display_window,
        None => create_display_window(app),
    }
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
async fn open_display_window(app: tauri::AppHandle) {
    get_or_create_display_window(&app);
}

#[tauri::command]
async fn show_scripture(app: tauri::AppHandle, verse: String, message: String) {
    let display_window = get_or_create_display_window(&app);


    if let Err(err) = display_window.emit_to(
        EventTarget::webview_window("display"),
        "show_scripture",
        Scripture { verse, message },
    ) {
        println!("{err} happened", err = err);
    };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            open_display_window,
            show_scripture,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
