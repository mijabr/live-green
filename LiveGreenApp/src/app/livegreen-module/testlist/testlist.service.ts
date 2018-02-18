import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { ApiService } from 'framework2';
import { Observable, Subject } from 'rxjs/Rx';

import { EnvironmentService } from '../../environment.service';

import { TestResult } from '../../models/testresult.model';
import { TestFeature } from '../../models/testfeature.model';

@Injectable()
export class TestListService {

    private options: RequestOptionsArgs;

    constructor(
        private env: EnvironmentService,
        private http: Http
    ) { }

    getUrlPrefix(): string {
        if (this.env.getEnvironment() === 'production') {
            return '';
        }

        return '';
    }

    getTestList(): Observable<TestResult[]> {
        const route: string = this.getUrlPrefix() + 'api/testresult';
        const response = this.http.get(route, this.options)
            .map((r: Response) => r.json())

        return response;
    }

    getTestListForBuildKey(buildResultKey: string): Observable<TestResult[]> {
        const route: string = this.getUrlPrefix() + 'api/testresult/TestRun/' + buildResultKey;
        const response = this.http.get(route, this.options)
            .map((r: Response) => r.json())

        return response;
    }

    getTestHistoryList(testid: string): Observable<TestResult[]> {
        const route: string = this.getUrlPrefix() + 'api/testresult/TestHistory/' + testid;
        const response = this.http.get(route, this.options)
            .map((r: Response) => r.json())

        return response;
    }

    getFeatureList(): Observable<TestFeature[]> {
        const route: string = this.getUrlPrefix() + 'api/testresult/summary';
        const response = this.http.get(route, this.options)
            .map((r: Response) => r.json())

        return response;
    }
}
