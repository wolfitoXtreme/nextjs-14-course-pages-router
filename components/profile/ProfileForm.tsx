import { FormEvent, useRef } from 'react';

import { IProfileForm } from '@/types';

import styles from './ProfileForm.module.scss';

const ProfileForm: React.FC<IProfileForm> = ({ onChangePassword }) => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    // FE validation...

    onChangePassword({
      sentOldPassword: oldPasswordRef?.current?.value || '',
      sentNewPassword: newPasswordRef?.current?.value || '',
    });
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
