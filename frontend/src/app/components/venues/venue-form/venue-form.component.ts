import { Component, OnInit } from '@angular/core';
import { Venue } from "../../../shared/models/venue.model";
import { VenueService } from "../../../services/venue.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
    selector: 'app-venue-form',
    templateUrl: './venue-form.component.html',
    styleUrls: ['./venue-form.component.scss']
})
export class VenueFormComponent implements OnInit {
    venueForm: FormGroup;
    userId: string;

    constructor(private authService: AuthService, private fb: FormBuilder, private venueService: VenueService, private router: Router) {
        this.venueForm = this.fb.group({
            ownerId: [{value: '', disabled: true}, Validators.required],
            name: ['', [Validators.required, Validators.minLength(3)]],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: [''],
            zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
            country: ['', Validators.required],
            capacity: ['', [Validators.required, Validators.min(1)]],
            type: ['', Validators.required],
            amenities: [''],
            images: ['']
        });
        this.userId = this.authService.userInfo?.id || '';

    }

    ngOnInit(): void {
        this.venueForm.patchValue({ ownerId: this.userId });
    }

    onSubmit() {
        if (this.venueForm.valid) {
            const formValues = this.venueForm.value;
            const newVenue: Venue = {
                ...this.venueForm.value,
                ownerId:this.userId,
                amenities: formValues.amenities ? formValues.amenities.split(',').map(item => item.trim()) : [],
                images: formValues.images ? formValues.images.split(',').map(item => item.trim()) : []
            }
            this.venueService.createVenue(newVenue).subscribe({
                next: (response) => {
                    console.log('Venue created successfully:', response);
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
