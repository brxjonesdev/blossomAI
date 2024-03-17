'use client'
import React from 'react'

export default function AuthForm({githubLogin}) {
  return (
    <form>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button type="submit" onClick={githubLogin}>Submit</button>
    </form>
  )
}
