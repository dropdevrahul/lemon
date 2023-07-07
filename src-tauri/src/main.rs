// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::collections::HashMap;

use lemmy_api_common::site::{GetSite, GetSiteResponse};
use lemon::{GetHttpClient, LemmyClient};
use reqwest::{get, Client};

#[tauri::command]
async fn get_posts(base_url: String) -> Result<serde_json::Value, String> {
    let client = GetHttpClient();
    let mut url = base_url;
    let res = client.get_posts(&mut url).await.unwrap();
    let json = res.text().await.unwrap();
    print!("str {}", json.as_str());
    let v: serde_json::Value = serde_json::from_str(json.as_str()).unwrap();

    return Ok(v);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_posts])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
