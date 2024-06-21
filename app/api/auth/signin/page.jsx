// pages/auth/signin.jsx (หรือ signin.js ถ้าใช้ JavaScript)
import { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        username,
        phone,
        redirect: false, // ป้องกันการ redirect โดยอัตโนมัติจาก NextAuth
      });

      if (result.error) {
        setError(result.error);
      } else {
        // ทำการ redirect ไปยังหน้า dashboard หลังจากลงชื่อเข้าใช้เรียบร้อย
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Authentication failed");
      console.error("Authentication error:", error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
