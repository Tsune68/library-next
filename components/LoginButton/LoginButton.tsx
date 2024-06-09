import { signIn } from "next-auth/react";
import Image from "next/image";
import slackLoginImage from "./slack_login.png";
import styles from "./LoginButton.module.scss";

export const LoginButton = () => {
  return (
    <button className={styles.loginButton} onClick={() => signIn("slack")}>
      <Image
       src={slackLoginImage}
       alt="slackログイン画像"
       width={300}
       height={150}
       />
    </button>
);
};
