import { Directive, AfterViewInit, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {

  constructor(private host: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.host.nativeElement).focus();
    this.cdr.detectChanges();
  }
}
