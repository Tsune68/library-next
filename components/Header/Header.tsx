import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./Header.module.scss";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <Link href="/" className={styles.link}>
            hajimari文庫
          </Link>
        </h1>
        <nav className={styles.nav}>
          <ul>
            {status === "authenticated" ? (
              <>
                <Link className={styles.header_list} href={`/books/store`}>
                  本を登録
                </Link>
                <Link
                  className={styles.header_list}
                  href={`/books/rentalHistory`}
                >
                  貸し出し履歴
                </Link>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className={styles.profileLink}
                >
                  <Image
                    src={session.user.image}
                    className={styles.icon}
                    alt="丸いアイコン"
                    width={50}
                    height={50}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className={styles.header_list}>
                  ログイン
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
