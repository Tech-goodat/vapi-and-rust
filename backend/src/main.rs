use axum::{
    routing::post,
    Router, Json,
    extract::State,
    http::StatusCode,
};
use serde::{Deserialize, Serialize};
use tower_http::cors::{CorsLayer, Any};
use std::sync::{Arc, Mutex};
use std::net::SocketAddr;

#[derive(Debug, Deserialize, Clone)]
struct SignupRequest {
    name: String,
    email: String,
    password: String,
}

#[derive(Debug, Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Debug, Serialize)]
struct ApiResponse {
    success: bool,
    message: String,
}

#[derive(Debug, Serialize)]
struct LoginResponse {
    success: bool,
    message: String,
    username: Option<String>,
}

#[derive(Default)]
struct AppState {
    users: Vec<SignupRequest>,
}

#[tokio::main]
async fn main() {
    let state = Arc::new(Mutex::new(AppState::default()));

    let app = Router::new()
        .route("/signup", post(signup_handler))
        .route("/login", post(login_handler))
        .with_state(state)
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        );

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("✅ Backend running at http://{}", addr);

    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}

async fn signup_handler(
    State(state): State<Arc<Mutex<AppState>>>,
    Json(payload): Json<SignupRequest>,
) -> (StatusCode, Json<ApiResponse>) {
    let mut app_state = state.lock().unwrap();

    // Check if email already exists
    if app_state.users.iter().any(|u| u.email == payload.email) {
        println!("❌ [SIGNUP] 400 Bad Request - Email already exists: {}", payload.email);
        return (
            StatusCode::BAD_REQUEST,
            Json(ApiResponse {
                success: false,
                message: "Email already exists".into(),
            }),
        );
    }

    app_state.users.push(payload.clone());

    println!("✅ [SIGNUP] 201 Created - User registered: {}", payload.email);
    (
        StatusCode::CREATED,
        Json(ApiResponse {
            success: true,
            message: format!("User {} registered successfully", payload.name),
        }),
    )
}

async fn login_handler(
    State(state): State<Arc<Mutex<AppState>>>,
    Json(payload): Json<LoginRequest>,
) -> (StatusCode, Json<LoginResponse>) {
    let app_state = state.lock().unwrap();

    if let Some(user) = app_state
        .users
        .iter()
        .find(|u| u.email == payload.email && u.password == payload.password)
    {
        println!("✅ [LOGIN] 200 OK - User logged in: {}", payload.email);
        (
            StatusCode::OK,
            Json(LoginResponse {
                success: true,
                message: format!("Welcome back, {}!", user.name),
                username: Some(user.name.clone()),
            }),
        )
    } else {
        println!("❌ [LOGIN] 401 Unauthorized - Invalid credentials for: {}", payload.email);
        (
            StatusCode::UNAUTHORIZED,
            Json(LoginResponse {
                success: false,
                message: "Invalid email or password".into(),
                username: None,
            }),
        )
    }
}
