import { Component } from '@angular/core';
import { TextBoxComponent } from '../text-box/text-box.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TextBoxComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'photo-sharing';
}
