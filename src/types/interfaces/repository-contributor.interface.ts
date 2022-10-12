import {IRepositoryOwner} from "./repository-owner.interface";

export interface IRepositoryContributor extends Partial<IRepositoryOwner> {
  contributions: number;
}
