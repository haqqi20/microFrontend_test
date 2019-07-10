import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {AppComponent} from './app.component';
import {EditCompanyService} from 'src/app/services/global_set/edit-company/edit-company.service';
import { ProfileService } from './services/global_set/profile/profile.service';
import { Employee } from './models/global_set/employee/employee';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({
    selector: 'app-topbar',
    styles: [``],
    // template: ``,
    templateUrl: 'app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    @Input() reset: boolean;
    acqu: any[];

    model: any[];

    theme = 'blue';

    layout = 'blue';

    version = '-v4';

    imageUrl: string;

    profileImage: string;

    employee = new Employee;

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

    constructor(
        public app: AppComponent,
        private companyService: EditCompanyService,
        private profileService: ProfileService,
        private apiService: EditCompanyService,
        // private basicAuth: BasicAuthenticationService,
        private authenticationService: AuthenticationService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private userService: UserService
        ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }

    ngOnInit() {
      this.loadAllUsers();

      this.acqu = [
            {label: 'Acquisition', icon: 'fa fa-fw fa-bars', routerLink: ['aplication']},
            {label: 'Account Management', icon: 'fa fa-fw fa-bars', routerLink: ['survey']},
            {label: 'Collection', icon: 'fa fa-fw fa-bars', routerLink: ['approval']},
            {label: 'Global Setting', icon: 'fa fa-fw fa-bars', routerLink: ['globalsetting']},
        ];
        this.model = [
            {
                label: 'Customization', icon: 'fa fa-fw fa-bars', badge: '8',
                items: [
                    {label: 'Static Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToStaticMenu()},
                    {label: 'Overlay Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToOverlayMenu()},
                    {label: 'Slim Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToSlimMenu()},
                    {label: 'Horizontal Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToHorizontalMenu()},
                    {label: 'Inline Profile', icon: 'fa fa-sun-o fa-fw', command: () => this.app.profileMode = 'inline'},
                    {label: 'Top Profile', icon: 'fa fa-moon-o fa-fw', command: () => this.app.profileMode = 'top'},
                    {label: 'Light Menu', icon: 'fa fa-sun-o fa-fw', command: () => this.app.darkMenu = false},
                    {label: 'Dark Menu', icon: 'fa fa-moon-o fa-fw', command: () => this.app.darkMenu = true}
                ]
            },
            {
                label: 'Layout Colors', icon: 'fa fa-fw fa-magic',
                items: [
                    {
                        label: 'Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('blue');
                        }
                    },
                    {
                        label: 'Purple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('purple');
                        }
                    },
                    {
                        label: 'Cyan', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('cyan');
                        }
                    },
                    {
                        label: 'Indigo', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('indigo');
                        }
                    },
                    {
                        label: 'Teal', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('teal');
                        }
                    },
                    {
                        label: 'Pink', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('pink');
                        }
                    },
                    {
                        label: 'Lime', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('lime');
                        }
                    },
                    {
                        label: 'Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('green');
                        }
                    },
                    {
                        label: 'Amber', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('amber');
                        }
                    },
                    {
                        label: 'Brown', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('brown');
                        }
                    },
                    {
                        label: 'Orange', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('orange');
                        }
                    },
                    {
                        label: 'Deep Purple', icon: 'fa fa-fw fa-paint-brush',
                        command: (event) => {
                            this.changeLayout('deeppurple');
                        }
                    },
                    {
                        label: 'Light Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('lightblue');
                        }
                    },
                    {
                        label: 'Light Green', icon: 'fa fa-fw fa-paint-brush',
                        command: (event) => {
                            this.changeLayout('lightgreen');
                        }
                    },
                    {
                        label: 'Dark Grey', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('darkgrey');
                        }
                    },
                ]
            },
            {
                label: 'Special', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    {
                        label: 'Influenza', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('influenza', true);
                        }
                    },
                    {
                        label: 'Suzy', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('suzy', true);
                        }
                    },
                    {
                        label: 'Calm', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('calm', true);
                        }
                    },
                    {
                        label: 'Crimson', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('crimson', true);
                        }
                    },
                    {
                        label: 'Night', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('night', true);
                        }
                    },
                    {
                        label: 'Skyling', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('skyline', true);
                        }
                    },
                    {
                        label: 'Sunkist', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('sunkist', true);
                        }
                    },
                    {
                        label: 'Little Leaf', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('littleleaf', true);
                        }
                    },
                    {
                        label: 'Joomla', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('joomla', true);
                        }
                    },
                    {
                        label: 'Firewatch', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeLayout('firewatch', true);
                        }
                    }
                ]
            },
            {
                label: 'Themes', icon: 'fa fa-fw fa-paint-brush', badge: '5',
                items: [
                    {
                        label: 'Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('blue');
                        }
                    },
                    {
                        label: 'Cyan', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('cyan');
                        }
                    },
                    {
                        label: 'Indigo', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('indigo');
                        }
                    },
                    {
                        label: 'Purple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('purple');
                        }
                    },
                    {
                        label: 'Teal', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('teal');
                        }
                    },
                    {
                        label: 'Orange', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('orange');
                        }
                    },
                    {
                        label: 'Deep Purple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('deeppurple');
                        }
                    },
                    {
                        label: 'Light Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('lightblue');
                        }
                    },
                    {
                        label: 'Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {
                            this.changeTheme('green');
                        }
                    },
                    // {label: 'Light Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('lightgreen'); }},
                    // {label: 'Lime', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('lime'); }},
                    // {label: 'Amber', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('amber'); }},
                    // {label: 'Brown', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('brown'); }},
                    // {label: 'Dark Grey', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('darkgrey'); }},
                    // {label: 'Pink', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('pink'); }},
                ]
            },
        ];

        this.companyService.getCompanyLogo('36f260ae-f649-461a-bc96-c36e15e85ff5').subscribe(
            data => {
                if (data.companyLogo != undefined) {
                    this.imageUrl = this.companyService.apiURL + 'files/' + data.companyLogo;
                } else {
                    this.imageUrl = data.companyName;
                }
            });
        this.profileService.getAvatar('5eb0321f-ad66-4c9a-94f6-34c0d4603b86').subscribe(
            data => {
                this.employee = data;
                if (data.image !== undefined) {
                    this.profileImage = this.profileService.apiURL + 'files/' + this.employee.image;
                } else {
                    this.profileImage = this.employee.fullName;
                }
            });
        this.companyService.currentLogo.subscribe(logo => this.imageUrl = logo);
        this.profileService.currentAvatar.subscribe(avatar => this.profileImage = avatar);
    }

    // logout() {
    //     console.log('perform logout');
    //     this.spinner.show();
    //     this.basicAuth.logout();
    //     this.spinner.hide();
    //     this.router.navigate(['login']);
    // }
  logout() {
    console.log('perform logout');
    this.spinner.show();
    // this.basicAuth.logout();
    this.spinner.hide();
    // this.router.navigate(['login']);
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

    changeTheme(theme: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');

        if (this.version === '-v4') {
            themeLink.href = 'assets/theme/theme-' + theme + '-v4' + '.css';
        }

        this.theme = theme;

    }

    changeLayout(layout: string, special?: boolean) {
        const layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');

        if (this.version === '-v4') {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '-v4' + '.css';
        }

        this.layout = layout;

        if (special) {
            this.app.darkMenu = true;
        }
    }

    changeVersion(version: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        const layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');

        if (version === '-v4') {
            themeLink.href = 'assets/theme/theme-' + this.theme + '-v4' + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '-v4' + '.css';
            this.version = '-v4';
        }

    }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
}
