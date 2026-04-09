import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pwd, setPwd] = useState({ current: '', new: '', confirm: '' });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (pwd.new !== pwd.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (pwd.new.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    // Mocking an API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password updated successfully');
      setPwd({ current: '', new: '', confirm: '' });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Your current account information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input value={user?.username || 'admin'} disabled />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input value={user?.role || 'Administrator'} disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <form onSubmit={handlePasswordChange}>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input 
                  id="current" 
                  type="password"
                  value={pwd.current}
                  onChange={(e) => setPwd({...pwd, current: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input 
                  id="new" 
                  type="password"
                  value={pwd.new}
                  onChange={(e) => setPwd({...pwd, new: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input 
                  id="confirm" 
                  type="password"
                  value={pwd.confirm}
                  onChange={(e) => setPwd({...pwd, confirm: e.target.value})}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading ? <span className="spinner mr-2" /> : null} 
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
