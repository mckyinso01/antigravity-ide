import Dexie, { type Table } from 'dexie';

export interface BedData {
  id: string;
  room: string;
  status: 'occupied' | 'empty' | 'cleaning';
  acuity: 'critical' | 'stable' | 'none';
  patientName?: string;
  evsStatus?: 'pending' | 'in-progress' | 'completed';
  tat?: number;
  x: number;
  y: number;
  rotation: number;
}

export interface EVSTask {
  id: string;
  room: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  requestTime: string;
  elapsedMinutes?: number;
}

export interface SecurityAlert {
  id: string;
  type: 'critical' | 'warn' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location: string;
  acknowledged: boolean;
}

export interface RoomData {
  id: string;
  name: string;
  status: 'occupied' | 'empty' | 'cleaning' | 'maintenance';
  acuity: 'critical' | 'stable' | 'none';
  patientName?: string;
  assignedNurse?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WallData {
  id: string;
  x: number;
  y: number;
  length: number;
  rotation: number;
  thickness: number;
}

export interface FloorTagData {
  id: string;
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
}

export interface FloorZoneData {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

export class PristineDatabase extends Dexie {
  beds!: Table<BedData, string>;
  evsTasks!: Table<EVSTask, string>;
  alerts!: Table<SecurityAlert, string>;
  rooms!: Table<RoomData, string>;
  walls!: Table<WallData, string>;
  floorTags!: Table<FloorTagData, string>;
  floorZones!: Table<FloorZoneData, string>;

  constructor() {
    super('ClinicalPristineDB_v2');
    this.version(1).stores({
      beds: 'id, status, acuity',
      evsTasks: 'id, status, priority',
      alerts: 'id, type, acknowledged',
      rooms: 'id, status, acuity',
      walls: 'id',
      floorTags: 'id',
      floorZones: 'id'
    });
  }
}

export const db = new PristineDatabase();
