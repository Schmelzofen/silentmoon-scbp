
const ProfileContent = () => {
    return (
      <>
        
        <div class="content">
        <h1>Your personal data</h1>
        <ul>
          <li>Pre-name: Ronald</li>
          <li>Last-name: McDonald</li>
          <li>email: ronald@mcdonald.com</li>
  
        </ul>
        </div>
        <form>
          <label for="oldpw">Current password:  </label>
          <input type="text id="oldpw></input><br/>
          <label for="newpw">New password:  </label>
          <input type="text id="newpw></input>
        </form>
        <button>Change Password</button>
      </>
    );
  };

export default ProfileContent;