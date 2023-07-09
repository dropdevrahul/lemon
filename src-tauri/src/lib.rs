extern crate reqwest;
use lemmy_api_common::site::{GetSite, GetSiteResponse};
use reqwest::{get, Client};
use std::{future::Future, process::Output};
use url::form_urlencoded::byte_serialize;

const VERSION: &str = "/api/v3";
const SITEURL: &str = "/site";
const POSTURL: &str = "/post";
const LISTURL: &str = "/list";
const COMMUNITY_URL: &str = "/community";

pub struct LemmyClient {
    pub client: Client,
    pub auth: String,
}

pub fn get_http_client() -> LemmyClient {
    let c = Client::builder().user_agent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        ).build().unwrap();
    LemmyClient {
        client: c,
        auth: String::from(""),
    }
}

impl LemmyClient {
    pub fn get_posts(
        &self,
        base_url: &mut String,
        page: &str,
        community_name: &str,
    ) -> impl Future<Output = Result<reqwest::Response, reqwest::Error>> {
        base_url.push_str(&VERSION);
        let mut listURL = format!("{}{}?page={}&sort=Active&limit=20", POSTURL, LISTURL, page);
        if community_name != "" {
            listURL = format!("{}&community_name={}", listURL, community_name)
        }
        base_url.push_str(listURL.as_str());
        let response = self.client.get(base_url.as_str()).send();
        return response;
    }

    pub fn get_communities(
        &self,
        base_url: &mut String,
    ) -> impl Future<Output = Result<reqwest::Response, reqwest::Error>> {
        base_url.push_str(&VERSION);
        let listURL = format!("{}{}?sort=TopDay&limit=20", COMMUNITY_URL, LISTURL,);
        println!("{}", listURL);
        base_url.push_str(listURL.as_str());
        let response = self.client.get(base_url.as_str()).send();
        return response;
    }
}
