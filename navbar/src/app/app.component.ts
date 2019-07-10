import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild, OnDestroy, ViewEncapsulation, OnInit } from '@angular/core';
import { ScrollPanel } from 'primeng/primeng';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/components/common/menuitem';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
import { GlobalSettingService } from './services/global_set/global-setting.service';

import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    SLIM,
    HORIZONTAL
}

@Component({
    selector: 'app-root',
    // selector: 'app',
    templateUrl: 'app.component.html' ,
    // templateUrl: './app.component.html',
    // styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    darkMenu = false;

    profileMode = 'top';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    items: MenuItem[];
    menuBarItems: MenuItem[];
    breadcrumbs: MenuItem[];
    home: any[];

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ScrollPanel;

   currentUser: User
    constructor(public renderer: Renderer2,
        private titleService: Title,
        private breadcrumbService: BreadcrumbService,
        private globalService: GlobalSettingService,
        private router: Router,
        private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

    ngOnInit() {
        this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
            this.titleService.setTitle(this.createTitle(crumbs));
            this.breadcrumbs = this.mapPrimeNgCrumbs(crumbs);
        });
        // this.home = {icon: 'pi pi-home'};
        this.home = [{ icon: 'pi pi-home', routerLink: ['/'] }];
        this.globalService.getPaginationOptions();
    }

    private createTitle(routesCollection: Breadcrumb[]) {
        const title = 'Multifinance';
        const titles = routesCollection.filter((route) => route.displayName);

        if (!titles.length) { return title; }

        const routeTitle = this.titlesToString(titles);
        return `${routeTitle} ${title}`;
    }

    private titlesToString(titles) {
        return titles.reduce((prev, curr) => {
            return `${curr.displayName} - ${prev}`;
        }, '');
    }

    private mapPrimeNgCrumbs(crumbs: Breadcrumb[]): MenuItem[] {
        return crumbs.map(c => <MenuItem>{ label: c.displayName, url: `#${c.url}` });
    }

    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 450);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    isSlim() {
        return this.layoutMode === MenuOrientation.SLIM;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    changeToSlimMenu() {
        this.layoutMode = MenuOrientation.SLIM;
    }

}
