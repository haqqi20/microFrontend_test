import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu layout-main-menu clearfix"
            [reset]="reset" visible="true" parentActive="true" ></ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    theme = 'blue';

    layout = 'blue';

    version = '-v4';

    activeRouter = '';

    constructor(
        public app: AppComponent,
        private router: Router
    ) {
        router.events
            .subscribe((evt) => {
                if (evt instanceof NavigationStart) {
                    this.activeRouter = evt.url;
                    this.ngOnInit();
                }
            });
    }

    ngOnInit() {

        console.log('app.menu.component');

        console.log('THISSSS ACTIVE ROUTE = ' + this.activeRouter);

        // console.log('ROUTE = ' + this.route);

        if (this.activeRouter === '/') {
            this.model = [
                { label: 'Dashboard', icon: 'fas fa-fw fa-home', routerLink: ['/dashboard'] },
                { label: 'My Task', icon: 'fas fa-fw fa-tasks', routerLink: ['/my-task'] },
            ];
        } else if (this.activeRouter.indexOf('/acquisition') === 0) {
            this.model = [
                { label: 'Dashboard', icon: 'fas fa-fw fa-home', routerLink: ['/dashboard'] },
                { label: 'My Task', icon: 'fas fa-fw fa-tasks', routerLink: ['/my-task'] },
                {
                    label: 'Application', icon: 'fas fa-fw fa-edit',
                    items: [
                        { label: 'Initial Data Entry', icon: 'fas fa-edit', routerLink: ['acquisition/aplication'] },
                    ]
                },
                {
                    label: 'Scoring', icon: 'fas fa-fw fa-balance-scale',
                    items: [
                        { label: 'Scoring List', icon: 'fas fa-balance-scale', routerLink: ['acquisition/scoring'] }
                    ]
                },
                {
                    label: 'Survey', icon: 'fas fa-fw fa-poll',
                    items: [
                        { label: 'Survey List', icon: 'fas fa-poll', routerLink: ['acquisition/survey'] },
                        { label: 'Surveyor Management', icon: 'fas fa-user-friends', routerLink: ['acquisition/survey/surveyor'] },
                        { label: 'Supervisor Management', icon: 'fas fa-user-alt', routerLink: ['acquisition/survey/supervisor'] },
                        { label: 'Template Management', icon: 'fas fa-folder-plus', routerLink: ['acquisition/survey/template'] },
                        { label: 'Survey Setting', icon: 'fas fa-cog', routerLink: ['acquisition/survey/setting'] }
                    ]
                },
                {
                    label: 'Approval', icon: 'fas fa-fw fa-check-double',
                    items: [
                        { label: 'Approval List', icon: 'fas fa-check-double', routerLink: ['acquisition/approval'] }
                    ]
                },
                { label: 'Disbursement', icon: 'fas fa-fw fa-money-check', routerLink: ['acquisition/disbursement'] },
                {
                    label: 'Product', icon: 'fas fa-fw fa-clone',
                    items: [
                        { label: 'Product Management', icon: 'fas fa-clone', routerLink: ['acquisition/product-management'] }
                    ]
                },
                {
                    label: 'Knockout', icon: 'fas fa-fw fa-file-archive',
                    items: [
                        { label: 'Knockout', icon: 'fas fa-file-archive', routerLink: ['acquisition/knockout'] },
                        { label: 'Operator Parameter', icon: 'fas fa-edit', routerLink: ['acquisition/knockout/operator'] },
                        { label: 'Criteria Parameter', icon: 'fas fa-edit', routerLink: ['acquisition/knockout/criteria'] }
                    ]
                },
                {
                    label: 'Fee', icon: 'fas fa-fw fa-money-check-alt',
                    items: [
                        { label: 'Fee Management', icon: 'fas fa-money-check-alt', routerLink: ['acquisition/fee-management'] },
                        { label: 'Fee Name Parameter', icon: 'fas fa-edit', routerLink: ['acquisition/fee/fee-name-parameter'] },
                        { label: 'Charging Basis Parameter', icon: 'fas fa-percentage', routerLink: ['acquisition/fee/charging-basis-parameter'] },
                        { label: 'Fee Type Parameter', icon: 'fas fa-coins', routerLink: ['acquisition/fee/fee-type-parameter'] },
                    ]
                },
                {
                    label: 'Document', icon: 'fas fa-fw fa-file-signature',
                    items: [
                        { label: 'Document Management', icon: 'fas fa-file-signature', routerLink: ['acquisition-doc/document'] },
                        { label: 'Document Type Parameter', icon: 'fas fa-id-card', routerLink: ['acquisition-doc/document/type'] }
                    ]
                }
            ];
        } else if (this.activeRouter.indexOf('/globalsetting') === 0) {
            this.model = [
                { label: 'Dashboard', icon: 'fas fa-fw fa-home', routerLink: ['/dashboard'] },
                { label: 'My Task', icon: 'fas fa-fw fa-tasks', routerLink: ['/my-task'] },
                { label: 'User Management', icon: 'fas fa-fw fa-user', routerLink: ['globalsetting/user-management'], },
                // {label: 'Office', icon: 'fas fa-fw fa-edit', routerLink: ['office']},
                {
                    label: 'Office', icon: 'fas fa-fw fa-building',
                    items: [
                        // {label: 'Add Office', icon: 'fas fa-fw fa-edit', routerLink: ['add_office']},
                        { label: 'List', icon: 'fas fa-table', routerLink: ['globalsetting/office'] },
                        { label: 'Structure', icon: 'fas fa-sitemap', routerLink: ['globalsetting/office/chart'] },
                    ]
                },
                { label: 'Company', icon: 'fas fa-fw fa-warehouse', routerLink: ['globalsetting/company'] },
                { label: 'Roles', icon: 'fas fa-fw fa-user', routerLink: ['globalsetting/roles'] },
                // { label: 'Business Unit', icon: 'fas fa-fw fa-cubes', routerLink: ['globalsetting/business-unit'] },
                { label: 'Lookup', icon: 'fas fa-fw fa-list', routerLink: ['globalsetting/lookup'] },
            ];
        } else if (this.activeRouter === '/account/management') {
            this.model = [
                { label: 'Dashboard', icon: 'fas fa-fw fa-home', routerLink: ['/dashboard'] },
                { label: 'My Task', icon: 'fas fa-fw fa-tasks', routerLink: ['/my-task'] },
            ];
        } else if (this.activeRouter === '/collection') {
            this.model = [
                { label: 'Dashboard', icon: 'fas fa-fw fa-home', routerLink: ['/dashboard'] },
                { label: 'My Task', icon: 'fas fa-fw fa-tasks', routerLink: ['/my-task'] },
            ];
        }
    }

    changeTheme(theme: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');

        if (this.version === '-v4') {
            themeLink.href = 'assets/theme/theme-' + theme + '-v4' + '.css';
        }

        this.theme = theme;

    }

    changeLayout(layout: string, special?: boolean) {
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        if (this.version === '-v4') {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '-v4' + '.css';
        }

        this.layout = layout;

        if (special) {
            this.app.darkMenu = true;
        }
    }

    changeVersion(version: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        if (version === '-v4') {
            themeLink.href = 'assets/theme/theme-' + this.theme + '-v4' + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '-v4' + '.css';
            this.version = '-v4';
        }

    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   class="ripplelink" *ngIf="!child.routerLink"
                    [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fas fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fas fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <div class="submenu-arrow" *ngIf="child.items"></div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?
                     'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                display: 'block'
            })),
            state('hidden', style({
                display: 'none'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;

    constructor(public app: AppComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = true;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
