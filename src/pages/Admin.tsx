import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { School, Upload, Trash2, LogOut, Plus } from "lucide-react";
import AuthCheck from "@/components/AuthCheck";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [contentForm, setContentForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "video" as "video" | "image",
    file: null as File | null,
    videoUrl: "",
  });

  // Check if user is admin
  const userRole = localStorage.getItem("userRole");
  if (userRole !== "admin") {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("loginExpiry");
    navigate("/login");
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would integrate with Supabase
      toast({
        title: "Content Added",
        description: "Content has been successfully added to the database.",
      });
      
      // Reset form
      setContentForm({
        title: "",
        description: "",
        category: "",
        type: "video",
        file: null,
        videoUrl: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContentForm({ ...contentForm, file });
    }
  };

  return (
    <AuthCheck>
      <div className="min-h-screen gradient-bg">
        <header className="header-gradient text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="college-logo">
                <School className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Admin Panel</h1>
                <p className="text-sm text-white/80">Government Degree College, Morthad</p>
              </div>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Content Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="gradient-text flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddContent} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Content Type</label>
                      <Select
                        value={contentForm.type}
                        onValueChange={(value: "video" | "image") => 
                          setContentForm({ ...contentForm, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={contentForm.title}
                        onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                        placeholder="Enter content title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select
                        value={contentForm.category}
                        onValueChange={(value) => setContentForm({ ...contentForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B.A.">B.A.</SelectItem>
                          <SelectItem value="B.Com">B.Com</SelectItem>
                          <SelectItem value="B.Sc Life Sci.">B.Sc Life Sci.</SelectItem>
                          <SelectItem value="B.Sc Phy Sci.">B.Sc Phy Sci.</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Campus Life">Campus Life</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {contentForm.type === "video" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Video URL (Vimeo)</label>
                        <Input
                          value={contentForm.videoUrl}
                          onChange={(e) => setContentForm({ ...contentForm, videoUrl: e.target.value })}
                          placeholder="https://player.vimeo.com/video/..."
                        />
                      </div>
                    )}

                    {contentForm.type === "image" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload Image</label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={contentForm.description}
                        onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
                        placeholder="Enter detailed description"
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full gradient-bg text-white" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Content"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Manage Content */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="gradient-text">Manage Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center text-muted-foreground">
                      <Upload className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">
                        Connect to Supabase to manage your content database
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Connect to Supabase for database</li>
                        <li>• Set up file storage</li>
                        <li>• Enable content management</li>
                        <li>• Deploy to production</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Content
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Bulk Upload
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthCheck>
  );
};

export default Admin;