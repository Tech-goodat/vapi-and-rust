Here’s your README in the exact framework you gave, adapted for your Rust + Axum backend project.

---

# 🧠 Moringa AI Capstone Project: Beginner’s Toolkit with GenAI

**Title:** *"Prompt-Powered Kickstart: Building a Beginner’s Toolkit for Rust (with Axum API)"*
**Duration:** Monday 4th August – Friday 8th August (Noon)

---

## 📍 Overview

In this capstone, I used generative AI prompts to explore and learn **Rust** and the **Axum** framework for building backend APIs.
The result is a beginner-friendly toolkit and a working API that can be run locally, making it easy for anyone new to Rust to quickly set up and test their own endpoints.

---

## 🎯 Project Goal

Using AI prompts (via ai.moringaschool.com), I aimed to:

* Learn the basics of **Rust** and the **Axum web framework**.
* Build a runnable API project in Rust.
* Document the installation, setup, and usage clearly.
* Share common issues faced and solutions.

---

## ✅ Deliverables

By the end of the week, I delivered:

* **Toolkit Document** (this README) with:

  * Overview of Rust & Axum
  * Setup instructions
  * Minimal working API example
  * AI prompts used and my reflections
  * Common errors & fixes
  * References to learning resources
* **Working Codebase** hosted locally on port **3000**.

---

## 🛠️ 1. Title & Objective

**Getting Started with Rust + Axum API – A Beginner’s Guide**

**Technology chosen:** Rust programming language with Axum web framework.
**Reason:** Rust is known for performance and memory safety, and Axum is an easy-to-use framework for building APIs in Rust.
**End goal:** Create a working API that responds to HTTP requests with a simple greeting message.

---

## 📚 2. Quick Summary of the Technology

**Rust** – A systems programming language focused on safety and performance.
**Axum** – A web framework built on top of Tokio for building APIs in Rust.

**Real-world example:** Axum is used in production by companies building high-performance web services and microservices where safety and speed are critical.

---

## 💻 3. System Requirements

* **OS:** Linux/Mac/Windows
* **Editor:** VS Code or any Rust-compatible IDE
* **Tools:**

  * Rust (install via [rustup](https://rustup.rs/))
  * Cargo (comes with Rust)
  * Git (for cloning repos)

---

## ⚙️ 4. Installation & Setup Instructions

### 1️⃣ Install Rust & Cargo

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Restart terminal after installation.

### 2️⃣ Create a new Rust project

```bash
cargo new backend
cd backend
```

### 3️⃣ Add dependencies to `Cargo.toml`

```toml
[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
```

### 4️⃣ Create `main.rs` with Axum API code

```rust
use axum::{Router, routing::get};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "Hello from Rust + Axum!" }));

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("✅ Backend running at http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
```

### 5️⃣ Run the project

```bash
cargo run
```

You should see:

```
✅ Backend running at http://0.0.0.0:3000
```

---

## 🔹 5. Minimal Working Example

**What it does:**
Starts a local web server on **port 3000** that returns a simple greeting.

**Expected Output in Browser:**

```
Hello from Rust + Axum!
```

---

## 📝 6. AI Prompt Journal

**Prompt used:**
*"Give me a step-by-step guide to build a Rust API with Axum that runs locally."*

**AI’s Response Summary:**
It gave me a scaffold for `Cargo.toml`, a minimal Axum example, and explained how to bind the server to `0.0.0.0:3000`.

**My Evaluation:**
The AI provided the correct structure, but I had to debug port binding issues and confirm that Tokio’s async runtime was installed with the `full` feature.

---

## ⚠️ 7. Common Issues & Fixes

**Issue:**

```
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: ...
```

**Fix:**
Ensure `tokio` is installed with `"full"` features in `Cargo.toml`.

**Issue:** Server not accessible in browser.
**Fix:** Use `0.0.0.0` instead of `127.0.0.1` to allow external access.

---

## 📚 8. References

* [Rust Official Docs](https://doc.rust-lang.org/)
* [Axum GitHub Repo](https://github.com/tokio-rs/axum)
* [Tokio Official Docs](https://tokio.rs/)

---

## 🚀 How to Run This Project

1. Clone the repo.
2. Install Rust and Cargo.
3. Run `cargo run`.
4. Open `http://0.0.0.0:3000` in your browser.

---

I can also make a **bonus diagram** showing how the Rust Axum server works so your README looks more polished.
Do you want me to include that next?
