import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { fingerPrintOutline, logoGoogle, logoMicrosoft } from 'ionicons/icons';
import { BiometricService } from '../services/biometric.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon]
})
export class LoginPage implements OnInit {
  private biometricService = inject(BiometricService);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    addIcons({ fingerPrintOutline, logoGoogle, logoMicrosoft, })
  }
  ngOnInit(): void {
    // this.authService.initAuth().then(() => {
    //   if (this.authService.isLoggedIn) {
    //     this.router.navigate(['/app/home']);
    //   }
    // });
  }

  userName: string | null = null; // Set this from your user service if available
  showMoreOptions = false;

  async biometricLogin() {
    // Call your biometric service here
    const success = await this.biometricService.authenticate();
    console.log(success)
  }

  passkeyLogin() {
    // Call your passkey login logic here
    // sample arguments for registration
    const createCredentialDefaultArgs: CredentialCreationOptions = {
      publicKey: {
        rp: { name: "Acme" },
        user: {
          id: new Uint8Array(16),
          name: "carina.p.anand@example.com",
          displayName: "Carina P. Anand",
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
        ],
        attestation: "direct",
        timeout: 60000,
        challenge: new Uint8Array([
          0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9,
          0xb9, 0x4e, 0x2e, 0x17, 0x1a, 0x98, 0x6a, 0x73,
          0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7, 0x6a, 0x15,
          0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
        ]).buffer,
      },
    };

    const getCredentialDefaultArgs: CredentialRequestOptions = {
      publicKey: {
        timeout: 60000,
        challenge: new Uint8Array([
          0x79, 0x50, 0x68, 0x71, 0xda, 0xee, 0xee, 0xb9,
          0x94, 0xc3, 0xc2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xe3, 0xf3, 0xab, 0x3b, 0x78, 0x2e, 0xd5, 0x6f,
          0x81, 0x26, 0xe2, 0xa6, 0x01, 0x7d, 0x74, 0x50,
        ]).buffer,
      },
    };
    navigator.credentials
      .create(createCredentialDefaultArgs)
      .then((cred) => {
        if (!cred) return;

        const publicKeyCred = cred as PublicKeyCredential;

        const idList: PublicKeyCredentialDescriptor[] = [
          {
            id: publicKeyCred.rawId,
            transports: ["internal"] as AuthenticatorTransport[],
            type: "public-key",
          },
        ];

        if (getCredentialDefaultArgs.publicKey) {
          getCredentialDefaultArgs.publicKey.allowCredentials = idList;
        }

        return navigator.credentials.get(getCredentialDefaultArgs);
      }).then((assertion) => {
        console.log(assertion)
        if (!assertion) return;
        // Process the assertion response here
      }).catch((err) => {
        console.error(err);
      });
  }
  initGoogleLogin() {

  }
  googleLogin() {
    // Start Google OAuth login
    // console.log("dfgdfgdf")
    //     console.log(this.authService.accessToken);

     this.authService.login();
  }
  microsoftLogin() {
    // Call your Microsoft OAuth logic here
  }

}
