import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please verify you are not a robot.");
      return;
    }
    console.log("SignUp submitted: ", { email, password, captchaToken });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <ReCAPTCHA
        sitekey="6LePgm4rAAAAAITlhXYYo4QIpQnsRczMa2hJ9UAl"
        onChange={(token) => setCaptchaToken(token)}
      />
      <br />
       <button type="submit" disabled={!captchaToken}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;