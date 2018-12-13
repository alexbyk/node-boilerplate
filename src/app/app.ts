import { Service } from 'typedi';
import { EntityManager } from 'typeorm';

@Service()
export class App {
  constructor(public manager: EntityManager) {
  }
  start() {

  }
}