import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CropKeeper';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initTheme();
  }

  initTheme(): void {
    const theme = localStorage.getItem('theme');
    this.renderer.addClass(document.body, theme || 'dark');
  }

  @HostListener('window:keyup', ['$event'])
  changeTheme(event: KeyboardEvent): void {
    if (event.keyCode !== 37) return;

    const theme = localStorage.getItem('theme') || 'dark';
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    ['light', 'dark'].forEach((t) =>
      this.renderer.removeClass(document.body, t)
    );

    this.renderer.addClass(document.body, newTheme);
    localStorage.setItem('theme', newTheme);
  }
}
