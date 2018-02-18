import { Injectable }    from '@angular/core';
import { ApiService }    from 'framework2';

@Injectable()
export class EmployeeService {
    constructor(private apiService: ApiService) { }

    getEmployeeList() {
        return this.apiService.get('/employeeListing.json');
    }
}