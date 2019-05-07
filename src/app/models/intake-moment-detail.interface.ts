export interface IntakeMomentDetailInterface {
    'id': string;
    'intake_start_time': string;
    'intake_end_time': string;
    'remark': string;
    'receiver_id': {
        'id': string;
        'name': string
    };
    'priority_number': {
        'number': string
    };
    'intake_moment_medicines': [
        {
            'time_window': string,
            'completed_at': string,
            'dosage': string,
            'medicine_id': string
        }
        ];
    checked: boolean;
}
