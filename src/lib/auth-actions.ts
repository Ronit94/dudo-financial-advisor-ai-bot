'use server'
import { signIn } from '@/auth'

export async function GithubSignIn() {
  return await signIn('github')
}