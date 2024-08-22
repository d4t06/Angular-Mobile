import { Injectable } from '@angular/core';

export type RatingState = {
   page: number;
   ratings: Rating[];
   status: 'loading' | 'error' | 'success' | 'more-loading';
   count: number;
   size: number;
};

type SetStatus = {
   variant: 'status';
   payload: RatingState['status'];
};

type Storing = {
   variant: 'storing';
   payload: Partial<RatingState> & {
      replace?: boolean;
   };
};

type Delete = {
   variant: 'delete';
   index: number;
};

type Approve = {
   variant: 'approve';
   index: number;
};

export type SetRatingState = Storing | Delete | Approve | SetStatus;

@Injectable({
   providedIn: 'root',
})
class RatingStore {
   ratings: Rating[] = [];
   count = 0;
   page = 1;
   size = 3;
   status: 'loading' | 'success' | 'error' | 'more-loading' = 'loading';

   setRatingStore = (props: SetRatingState) => {
      switch (props.variant) {
         case 'delete': {
            const newRatings = [...this.ratings];
            newRatings.splice(props.index, 1);

            Object.assign(this, { ratings: newRatings });
            break;
         }

         case 'approve': {
            const newRatings = [...this.ratings];

            const newRating: Rating = { ...newRatings[props.index] };
            newRating.approve = 1;
            newRatings[props.index] = newRating;

            Object.assign(this, { ratings: newRatings });
            break;
         }

         case 'storing': {
            const payload = props.payload;

            console.log('check payload', payload);

            if (payload.replace) {
               Object.assign(this, payload);
            } else {
               payload.ratings = [...this.ratings, ...(payload.ratings || [])];
               Object.assign(this, payload);
            }

            break;
         }

         case 'status': {
            Object.assign(this, { status: props.payload });
            break;
         }

         default:
            throw new Error('acton not found');
      }
   };
}

export default RatingStore;
