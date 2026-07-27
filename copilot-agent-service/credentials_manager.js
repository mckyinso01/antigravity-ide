import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export class CredentialsManager {
  static getGitHubToken() {
    // Priority 1: Environment Variable GITHUB_COPILOT_TOKEN or GITHUB_TOKEN
    const envToken = process.env.GITHUB_COPILOT_TOKEN || process.env.GITHUB_TOKEN;
    if (envToken && envToken.trim().length > 0) {
      return envToken.trim();
    }

    // Priority 2: Local agent secure credentials config file (git-ignored)
    const configPath = path.join(process.cwd(), '.copilot_token');
    if (fs.existsSync(configPath)) {
      const fileToken = fs.readFileSync(configPath, 'utf-8').trim();
      if (fileToken.length > 0) {
        return fileToken;
      }
    }

    // Return null if token is not yet provided by user
    return null;
  }

  static isTokenConfigured() {
    const token = this.getGitHubToken();
    return token !== null && token.length > 5;
  }
}
