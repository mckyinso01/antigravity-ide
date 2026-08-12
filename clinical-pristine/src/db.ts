import Dexie, { type Table } from 'dexie';

export interface BedData {
  id: string;
  room: string;
  status: 'occupied' | 'empty' | 'cleaning';
  acuity: 'critical' | 'stable' | 'none';
  patientName?: string;
  evsStatus?: 'pending' | 'in-progress' | 'completed';
  tat?: number;
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
}

export class PristineDatabase extends Dexie {
  beds!: Table<BedData, string>;
  evsTasks!: Table<EVSTask, string>;
  alerts!: Table<SecurityAlert, string>;
  rooms!: Table<RoomData, string>;

  constructor() {
    super('ClinicalPristineDB');
    this.version(1).stores({
      beds: 'id, status, acuity',
      evsTasks: 'id, status, priority',
      alerts: 'id, type, acknowledged',
      rooms: 'id, status, acuity'
    });
  }
}

export const db = new PristineDatabase();
