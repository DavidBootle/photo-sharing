import { Component } from '@angular/core';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [],
  template: `
    <div class="full-page-container">
        <p>I'm in the middle!</p>
    </div>
  `,
  styles: `
    .full-page-container {
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    p {
        color: white;
    }
  `,
})
export class ManagementPageComponent {

}
