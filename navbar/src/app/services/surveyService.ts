import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Surveyor } from '@app/models/acquisition/survey/surveyor';
import { Supervisor } from '@app/models/acquisition/survey/supervisor';
import { Survey } from '@app/models/acquisition/survey/survey';
import { Template } from '@app/models/acquisition/survey/template';
import { Setting } from '@app/models/acquisition/survey/setting';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class SurveyService {

    private refresh = new Subject<void>();

    get refreshNeeded() {
        return this.refresh;
    }

    tmplLists: Template[] = [];
    private template = new BehaviorSubject(this.tmplLists);
    currentTemplate = this.template.asObservable();

    surveyorLists: Surveyor[] = [];
    private surveyor = new BehaviorSubject(this.surveyorLists);
    currentSurveyor = this.surveyor.asObservable();

    supervisorLists: Supervisor[] = [];
    private supervisor = new BehaviorSubject(this.supervisorLists);
    currentSupervisor = this.supervisor.asObservable();

    constructor(private http: HttpClient) { }

    getSurvey() {
        return this.http.get<any>('assets/demo/data/survey-data.json')
            .toPromise()
            .then(res => <Survey[]>res.data)
            .then(data => data);
    }

    getEmployee() {
        return this.http.get<any>('assets/demo/data/employee-data.json')
            .toPromise()
            .then(res => <any[]>res.data)
            .then(data => data);
    }

    getSurveyor() {
        return this.http.get<any>('assets/demo/data/survey-surveyor-data.json')
            .toPromise()
            .then(res => <Surveyor[]>res.data)
            .then(data => data);
    }

    getPersonalSurveyor(npk: string) {
        return this.http.get<any>('assets/demo/data/survey-surveyor-data-' + npk + '.json')
            .toPromise()
            .then(res => <Surveyor>res.data)
            .then(data => data);
    }

    getSupervisor() {
        return this.http.get<any>('assets/demo/data/survey-supervisor-data.json')
            .toPromise()
            .then(res => <Supervisor[]>res.data)
            .then(data => data);
    }

    getPersonalSupervisor(npk: string) {
        return this.http.get<any>('assets/demo/data/survey-supervisor-data-' + npk + '.json')
            .toPromise()
            .then(res => <Supervisor>res.data)
            .then(data => data);
    }

    getTemplate() {
        return this.http.get<any>('assets/demo/data/survey-template-data.json')
            .toPromise()
            .then(res => <Template[]>res.data)
            .then(data => data);
    }

    isiTemplate(payload: any) {
        this.tmplLists.push(payload);
        console.log(this.tmplLists);
    }

    isiSurveyor(payload: any) {
        this.surveyorLists.push(payload);
    }

    isiSupervisor(payload: any) {
        this.supervisorLists.push(payload);
    }

    getSetting() {
        return this.http.get<any>('assets/demo/data/survey-setting-data.json')
            .toPromise()
            .then(res => <Setting>res.data)
            .then(data => data);
    }
}
