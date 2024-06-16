type UserAvatarProps = {
  name: string;
  classNames: string;
};

const UserAvatar = ({ name, classNames }: UserAvatarProps) => {
  return (
    <>
      <div
        className={`bg-black text-white rounded-full flex items-center justify-center ${classNames}`}
        style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)' }}
      >
        {name?.charAt(0).toUpperCase()}
      </div>
    </>
  );
};

export default UserAvatar;
