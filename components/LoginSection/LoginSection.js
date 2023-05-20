import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import styles from "./LoginSection.module.css";
import { useState } from "react";

function LoginSection(props) {
  const [showregistration, setShowRegistration] = useState(false);

  const showRegHandler = (e) => {
    e.preventDefault();
    setShowRegistration(true);
  };

  const showLoginHandler = (e) => {
    e.preventDefault();
    setShowRegistration(false);
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.container}>
        {!showregistration && (
          <LoginForm onShowReg={showRegHandler}></LoginForm>
        )}

        {showregistration && (
          <RegistrationForm onShowLogin={showLoginHandler}></RegistrationForm>
        )}
      </div>
    </section>
  );
}
export default LoginSection;
