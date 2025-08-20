import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Award, 
  Users, 
  Globe, 
  Heart, 
  Shield, 
  Truck, 
  RotateCcw, 
  Star,
  CheckCircle,
  TrendingUp,
  Zap,
  Palette
} from "lucide-react";

const About = () => {
  const { addToRefs } = useScrollAnimation();

  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Years of Excellence", value: "10+", icon: Award },
    { label: "Products Delivered", value: "100K+", icon: Heart },
  ];

  const values = [
    {
      title: "Quality First",
      description: "We never compromise on quality. Every product is carefully selected and tested.",
      icon: Shield,
    },
    {
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We're here to help you look and feel your best.",
      icon: Heart,
    },
    {
      title: "Innovation",
      description: "We stay ahead of trends while maintaining timeless style and functionality.",
      icon: Zap,
    },
    {
      title: "Sustainability",
      description: "Committed to eco-friendly practices and responsible fashion choices.",
      icon: Palette,
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Former fashion editor with 15+ years in the industry.",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Award-winning designer with a passion for sustainable fashion.",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Supply chain expert ensuring quality and efficiency.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={addToRefs} className="scroll-animate text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">About NOIR</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Crafting Style,{" "}
                <span className="text-primary">Defining Fashion</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We're more than just a fashion brand. We're a movement towards conscious, 
                quality-driven style that empowers individuals to express their unique identity.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg">Our Story</Button>
                <Button variant="outline" size="lg">Meet the Team</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={addToRefs} className="scroll-animate grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div ref={addToRefs} className="scroll-animate">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2014, NOIR began as a small boutique with a big vision: to create 
                  fashion that doesn't just look good, but feels good and does good.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  What started as a passion project has grown into a global community of style-conscious 
                  individuals who value quality, sustainability, and authentic expression.
                </p>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Certified B Corporation</span>
                </div>
              </div>
              <div ref={addToRefs} className="scroll-animate">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                    alt="NOIR Store" 
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Growing Strong</span>
                    </div>
                    <p className="text-sm text-muted-foreground">10+ years of fashion excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={addToRefs} className="scroll-animate text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={addToRefs} className="scroll-animate text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind NOIR's success
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div ref={addToRefs} className="scroll-animate">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join the NOIR Community</h2>
              <p className="text-xl mb-8 opacity-90">
                Be part of a movement that celebrates style, quality, and conscious living.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="secondary" size="lg">Shop Now</Button>
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
