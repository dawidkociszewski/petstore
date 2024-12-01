import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild} from '@angular/core';
import {PetApiService} from '../../services/pet-api.service';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {IPet, PetStatus} from '../../interfaces/pet';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MapStatus} from '../../const/status';
import {concatMap, filter, map, Observable, tap} from 'rxjs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialog/dialog.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NotificationService} from '../../services/notification.service';
import {GetLabelPipe} from '../../pipes/getlabel.pipe';

@Component({
  selector: 'app-list',
  imports: [MatButtonModule, MatCardModule, MatSelectModule, ReactiveFormsModule,
    MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIcon, MatDialogModule, GetLabelPipe],
  templateUrl: './list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<IPet> = new MatTableDataSource<IPet>();
  public searchForm: FormGroup;
  protected readonly availableStatus = MapStatus;
  protected readonly displayedColumns: string[] = ['name', 'category', 'tags', 'status', 'action'];

  constructor(private readonly apiService: PetApiService, private readonly router: Router,
              private readonly dialog: MatDialog, private readonly destroyRef: DestroyRef,
              private readonly utils: NotificationService, private readonly cdr: ChangeDetectorRef) {
  }

  static searchForm(): FormGroup {
    return new FormGroup({
      status: new FormControl<PetStatus>(PetStatus.AVAILABLE),
      name: new FormControl<string>(null)
    })
  }

  ngOnInit(): void {
    this.searchForm = ListComponent.searchForm();
    this.getList().subscribe({
      error: (error): void => {
        if (error?.error) {
          this.utils.showNotification(error.message)
        }
      }
    });
  }

  public addPet(): void {
    void this.router.navigate(['/add-pet']);
  }

  public edit(id: number): void {
    void this.router.navigate([`/edit-pet/${id}`]);
  }

  public details(id: number): void {
    void this.router.navigate([`/details-pet/${id}`]);
  }

  public remove(id: number, name: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        name,
      },
    });
    dialogRef.afterClosed().pipe(
      filter((result) => !!result),
      takeUntilDestroyed(this.destroyRef),
      concatMap(() => this.apiService.removePet(id)),
      concatMap(() => this.getList(this.searchForm.value.status, this.searchForm.value.name))
    )
      .subscribe({
        next: () => this.utils.showNotification(`${name} was successfully removed.`),
        error: (error): void => {
          if (error?.error) {
            this.utils.showNotification(error.message)
          }
        }
      });
  }

  public search(): void {
    const formValue = this.searchForm.getRawValue();
    this.getList(formValue.status, formValue.name).subscribe({
      error: (error): void => {
        if (error?.error) {
          this.utils.showNotification(error.message)
        }
      }
    });
  }

  public reset(): void {
    this.searchForm = ListComponent.searchForm();
    this.getList().subscribe({
      error: (error): void => {
        if (error?.error) {
          this.utils.showNotification(error.message)
        }
      }
    });
  }

  private getList(param: PetStatus = PetStatus.AVAILABLE, name?: string): Observable<IPet[]> {
    return this.apiService.getList(param).pipe(map((response: IPet[]): IPet[] => {
      if (name) {
        return response.filter((pet: IPet): boolean => pet?.name?.toLowerCase() === name.toLowerCase());
      }
      return response;
    }), tap((response: IPet[]): void => {
      this.dataSource = new MatTableDataSource<IPet>(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    }));
  }

}
