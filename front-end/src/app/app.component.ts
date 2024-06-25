import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextBoxComponent } from './text-box/text-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'photo-sharing';
}
