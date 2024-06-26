import { Component } from '@angular/core';
import { TextBoxComponent } from '../text-box/text-box.component';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [TextBoxComponent],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.scss'
})
export class ManagementPageComponent {

}
