/**
 * Authentication middleware for dashboard
 * Verifies password from environment variable
 */

import bcrypt from 'bcryptjs';

export function verifyPassword(password) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
        throw new Error('ADMIN_PASSWORD environment variable is not set');
    }
    
    // Direct comparison (you can also use bcrypt.compareSync for hashed passwords)
    return password === adminPassword;
}

export function createSession() {
    // Create a simple session token (you might want to use JWT in production)
    const token = Buffer.from(
        `${Date.now()}-${Math.random().toString(36)}`
    ).toString('base64');
    
    return token;
}

export function verifySession(token) {
    if (!token) return false;
    
    try {
        // Simple token validation - in production, use JWT or better session management
        const decoded = Buffer.from(token, 'base64').toString();
        const [timestamp] = decoded.split('-');
        
        // Check if token is less than 24 hours old
        const tokenAge = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        return tokenAge < maxAge;
    } catch (error) {
        return false;
    }
}
