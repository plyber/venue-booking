import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { VenueService } from '../../../services/venue.service';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/models/user';
import { Venue } from '../../../shared/models/venue.model';

@Component({
  selector: 'app-venue-form',
  templateUrl: './venue-form.component.html',
  styleUrls: ['./venue-form.component.scss']
})
export class VenueFormComponent implements OnInit {
  venueForm: FormGroup;
  userId: string = '';
  user?: User;
  private sub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private venueService: VenueService,
    private router: Router
  ) {
    this.venueForm = this.fb.group({
      ownerId: [{ value: '', disabled: true }, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      country: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      amenities: [''],
      imagesArray: this.fb.array([this.fb.control('')])
    });
  }

  ngOnInit(): void {
    this.sub.add(
      this.authService.user.subscribe(data => {
        this.user = data;
        if (this.user) {
          this.userId = this.user.userId;
          this.venueForm.patchValue({ ownerId: this.userId });
        }
      })
    );
  }

  get imagesArray(): FormArray {
    return this.venueForm.get('imagesArray') as FormArray;
  }

  addImage(): void {
    this.imagesArray.push(this.fb.control(''));
  }

  removeImage(index: number): void {
    this.imagesArray.removeAt(index);
  }

  onSubmit() {
    if (this.venueForm.valid) {
      const formValues = this.venueForm.value;
      const newVenue: Venue = {
        ...formValues,
        ownerId: this.userId,
        createdAt: new Date(),
        amenities: formValues.amenities ? formValues.amenities.split(',').map(item => item.trim()) : [],
        images: formValues.imagesArray
          .map((image: string) => image.trim())
          .filter((image: string) => image !== '')
      };

      this.venueService.createVenue(newVenue).subscribe({
        next: () => {
          this.router.navigate(['/my-venues']);
        },
        error: (error) => {
          console.error('Error creating venue:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
