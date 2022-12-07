import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { createUser } from "../api";
import ErrorPageIndicator from "../Indicator/ErrorPageIndicator";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import styles from "./Authentication.module.css";
export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const {setIsLogin}=useContext(AuthContext)
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let [formData, setFormData] = useState({});
  const handleChange = (key, value) => {
    formData = { ...formData, [key]: value };
    setFormData({ ...formData });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { data } = await createUser(formData);
    localStorage.setItem("token",data?.data?.token)
    localStorage.setItem('email',formData?.email)
    setIsLogin(true)
      setError(false);
    } catch (e) {
      setError(true);

      console.log(e);
      let responseData = setErrorMsg(JSON.stringify(e?.response?.data));
      setLoading(false);
    }
  };
  return (
    <div>
      {error && <ErrorPageIndicator msg={errorMsg} />}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <form
          method="post"
          onSubmit={handleSubmit}
          className={styles.container}
        >
          <div>
            <div className={styles.bolderFont}>Name:</div>
            <div>
              <input
                type="text"
                placeholder="steve jobs"
                className={styles.inputBox}
                onChange={(e) => handleChange("name", e.target.value)}
                value={formData?.name ?? ""}
              />
            </div>
          </div>
          <div>
            <div className={styles.bolderFont}>Email:</div>
            <div>
              <input
                type="email"
                placeholder="someone@gmail.com"
                className={styles.inputBox}
                onChange={(e) => handleChange("email", e.target.value)}
                value={formData?.email ?? ""}
              />
            </div>
          </div>
          <div>
            <div className={styles.bolderFont}>Password:</div>
            <div>
              <input
                type="password"
                placeholder="password"
                className={styles.inputBox}
                onChange={(e) => handleChange("password", e.target.value)}
                value={formData?.password ?? ""}
              />
            </div>
          </div>
          <div>
            <input type="submit" value="login" />
          </div>
        </form>
      )}
    </div>
  );
}
