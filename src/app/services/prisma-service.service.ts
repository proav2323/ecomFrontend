import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrismaServiceService {
  prisma: Object | null = null;
  constructor(private HttpClient: HttpClient) {
    this.getPrisma().subscribe((data) => {
      this.prisma = data;
    });
  }

  getPrisma() {
    const prisma = this.HttpClient.get('/');
    return prisma;
  }
}
