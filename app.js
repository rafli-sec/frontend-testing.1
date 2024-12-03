const API_BASE = "http://localhost:3000"; // Ganti dengan URL API Anda
let token = null;

// Register
async function register() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    alert(data.message || "Registration successful!");
  } catch (err) {
    console.error(err);
    alert("Error during registration");
  }
}

// Login
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      token = data.token;
      document.getElementById("login-form").style.display = "none";
      document.getElementById("home").style.display = "block";
      document.getElementById("home-message").innerText = "You are logged in!";
    } else {
      alert(data.message || "Login failed!");
    }
  } catch (err) {
    console.error(err);
    alert("Error during login");
  }
}

// Forgot Password
async function forgotPassword() {
  const email = document.getElementById("forgot-email").value;

  try {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(data.message || "Password reset email sent!");
  } catch (err) {
    console.error(err);
    alert("Error during password reset");
  }
}

// Update Profile
async function updateProfile() {
  const name = document.getElementById("profile-name").value;
  const age = document.getElementById("profile-age").value;
  const gender = document.getElementById("profile-gender").value;

  try {
    const res = await fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, age, gender }),
    });
    const data = await res.json();
    alert(data.message || "Profile updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Error during profile update");
  }
}

// Logout
function logout() {
  token = null;
  document.getElementById("home").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}
