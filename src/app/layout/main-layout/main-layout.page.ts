import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pulseOutline, folderOutline, checkboxOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet]
})
export class MainLayoutPage implements OnInit {

constructor() {
    addIcons({
      pulseOutline,
      folderOutline,
      checkboxOutline,
      personOutline
    });
  }
  ngOnInit() {
  }

}
