import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Store, 
  Mail, 
  Shield, 
  Palette, 
  Bell,
  Save,
  Globe,
  CreditCard,
  Truck
} from "lucide-react";

const Settings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "LUXE",
    storeDescription: "Premium clothing and accessories store",
    storeEmail: "contact@luxe.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Fashion Street, Style City, SC 12345",
    currency: "USD",
    timezone: "America/New_York"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    reviewNotifications: true,
    newsletterNotifications: false,
    lowStockAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "24",
    passwordExpiry: "90",
    loginAttempts: "5"
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    primaryColor: "#000000",
    accentColor: "#3b82f6",
    logoUrl: "/logo.png"
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: "100",
    standardShippingRate: "9.99",
    expressShippingRate: "19.99",
    internationalShipping: true
  });

  const handleSave = (section: string) => {
    // In a real app, this would save to backend
    console.log(`Saving ${section} settings...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your store settings and preferences
        </p>
      </div>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Store Information
          </CardTitle>
          <CardDescription>
            Basic store details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input
                id="storeEmail"
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="storeDescription">Store Description</Label>
            <Textarea
              id="storeDescription"
              value={storeSettings.storeDescription}
              onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storePhone">Phone Number</Label>
              <Input
                id="storePhone"
                value={storeSettings.storePhone}
                onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="storeAddress">Store Address</Label>
            <Textarea
              id="storeAddress"
              value={storeSettings.storeAddress}
              onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
              rows={2}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('store')}>
              <Save className="mr-2 h-4 w-4" />
              Save Store Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure when and how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderNotifications">Order Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about new orders</p>
              </div>
              <Switch
                id="orderNotifications"
                checked={notificationSettings.orderNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderNotifications: checked})}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reviewNotifications">Review Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about new reviews</p>
              </div>
              <Switch
                id="reviewNotifications"
                checked={notificationSettings.reviewNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, reviewNotifications: checked})}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
              </div>
              <Switch
                id="lowStockAlerts"
                checked={notificationSettings.lowStockAlerts}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStockAlerts: checked})}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('notifications')}>
              <Save className="mr-2 h-4 w-4" />
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
            </div>
            <Switch
              id="twoFactorAuth"
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: e.target.value})}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('security')}>
              <Save className="mr-2 h-4 w-4" />
              Save Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance Settings
          </CardTitle>
          <CardDescription>
            Customize the look and feel of your store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <select
                id="theme"
                value={appearanceSettings.theme}
                onChange={(e) => setAppearanceSettings({...appearanceSettings, theme: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={appearanceSettings.logoUrl}
                onChange={(e) => setAppearanceSettings({...appearanceSettings, logoUrl: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={appearanceSettings.primaryColor}
                  onChange={(e) => setAppearanceSettings({...appearanceSettings, primaryColor: e.target.value})}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={appearanceSettings.primaryColor}
                  onChange={(e) => setAppearanceSettings({...appearanceSettings, primaryColor: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="accentColor"
                  type="color"
                  value={appearanceSettings.accentColor}
                  onChange={(e) => setAppearanceSettings({...appearanceSettings, accentColor: e.target.value})}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={appearanceSettings.accentColor}
                  onChange={(e) => setAppearanceSettings({...appearanceSettings, accentColor: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('appearance')}>
              <Save className="mr-2 h-4 w-4" />
              Save Appearance Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Settings
          </CardTitle>
          <CardDescription>
            Configure shipping rates and options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                step="0.01"
                value={shippingSettings.freeShippingThreshold}
                onChange={(e) => setShippingSettings({...shippingSettings, freeShippingThreshold: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="standardShippingRate">Standard Shipping Rate ($)</Label>
              <Input
                id="standardShippingRate"
                type="number"
                step="0.01"
                value={shippingSettings.standardShippingRate}
                onChange={(e) => setShippingSettings({...shippingSettings, standardShippingRate: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expressShippingRate">Express Shipping Rate ($)</Label>
              <Input
                id="expressShippingRate"
                type="number"
                step="0.01"
                value={shippingSettings.expressShippingRate}
                onChange={(e) => setShippingSettings({...shippingSettings, expressShippingRate: e.target.value})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="internationalShipping">International Shipping</Label>
                <p className="text-sm text-muted-foreground">Enable shipping to other countries</p>
              </div>
              <Switch
                id="internationalShipping"
                checked={shippingSettings.internationalShipping}
                onCheckedChange={(checked) => setShippingSettings({...shippingSettings, internationalShipping: checked})}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => handleSave('shipping')}>
              <Save className="mr-2 h-4 w-4" />
              Save Shipping Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
