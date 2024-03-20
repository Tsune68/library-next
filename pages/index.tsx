import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const {data: session, status} = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "authenticated") {
    return (
      <>
        <p>You are logged in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </>
    )
  } else {
    return (
      <button onClick={() => signIn("slack")}>Login</button>
    )
  }
}
