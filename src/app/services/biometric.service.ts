import { Injectable } from '@angular/core';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { Capacitor } from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class BiometricService {

    async authenticate(): Promise<boolean> {
        // 👉 Prevent running on web
        if (!Capacitor.isNativePlatform()) {
            return window.confirm('Biometric not available in browser. Use fallback?');
        }

        try {
            await NativeBiometric.verifyIdentity({
                reason: 'Access your secure vault',
                title: 'Biometric Authentication',
                subtitle: 'Verify your identity',
                description: 'Use fingerprint or face recognition',
            });

  return true; // success

        } catch (error: any) {
            console.error('Biometric authentication error:', error);

            if (error?.code === 'USER_CANCEL') {
                throw new Error('Authentication cancelled');
            }

            if (error?.code === 'LOCKED_OUT') {
                throw new Error('Too many attempts. Try later.');
            }

            if (error?.code === 'NOT_ENROLLED') {
                throw new Error('No biometrics enrolled on this device.');
            }

            throw new Error('Authentication failed');
        }
    }

    async checkAvailability(): Promise<{ has: boolean; biometryType?: any }> {
        if (!Capacitor.isNativePlatform()) {
            return { has: false };
        }

        try {
            const result = await NativeBiometric.isAvailable();

            return {
                has: result.isAvailable,
                biometryType: result.biometryType
            };

        } catch (error) {
            console.error('Availability check failed:', error);
            return { has: false };
        }
    }
}