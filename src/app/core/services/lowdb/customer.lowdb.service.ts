import { Injectable } from '@angular/core';
import { LowdbService } from './lowdb.service';
import { IDatabaseConnect, IDatabaseModel, ITableDatabase } from '../../interfaces/database.iterface';
import { CustomerModel } from '../../models/customer.model';
import { ItemModel } from 'app/core/models/item.model';

const defaultObject: ITableDatabase = {
  main: [],
  settings: {}
};

@Injectable({
  providedIn: 'root'
})
export class CustomerDBService implements IDatabaseConnect {
  database: any;
  databaseName: string = 'customer';
  defaultObject: ITableDatabase = defaultObject;

  constructor(
    private lowdbService: LowdbService,
  ) {}

  init() {
    this.connect();
  }
  connect() {
   return this.lowdbService.connect(this.databaseName, this.defaultObject);
  }

  getMain() {
    return this.connect().get('main').value();
  }
  getSettings() {
  }

  setMain(item: IDatabaseModel) {
    return this.connect().get('main').push(item).write();
  }

  changeMainSingle(item: IDatabaseModel) {
    const allOfMain: IDatabaseModel[] = this.getMain();
    const correctMain = allOfMain.reduce((accum: IDatabaseModel[], value: IDatabaseModel) => {
      if (value.id === item.id) {
        accum.push(item);
      } else  {
        accum.push(value);
      }
      return accum;
    }, []);
    return this.connect().set('main', correctMain).write();
  }

  setSettings(item: Object, prop) {
    return this.connect().set('settings', item).write();
  }

  removeMain(id: number) {
    return this.connect().get('main').remove({ id }).write()
  }
  removeSettings(id: number) {
  }
}
