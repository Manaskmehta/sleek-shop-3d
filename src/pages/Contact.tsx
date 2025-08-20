import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const { addToRefs } = useScrollAnimation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const contactMethods = [
    {
      title: "Email Us",
      description: "Get in touch via email",
      icon: Mail,
      value: "hello@noir.com",
      action: "Send Email",
    },
    {
      title: "Call Us",
      description: "Speak with our team",
      icon: Phone,
      value: "+1 (555) 123-4567",
      action: "Call Now",
    },
    {
      title: "Visit Us",
      description: "Stop by our flagship store",
      icon: MapPin,
      value: "123 Fashion Ave, NYC",
      action: "Get Directions",
    },
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy. Items must be unworn, unwashed, and in original packaging with all tags attached."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
    },
    {
      question: "Do you offer size exchanges?",
      answer: "Yes! If you need a different size, you can exchange your item within 30 days of purchase. Exchanges are free for US customers."
    },
    {
      question: "How do I care for my NOIR items?",
      answer: "Care instructions are included with each item. Generally, we recommend gentle washing and air drying to maintain quality."
    },
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Fashion Avenue, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    },
    {
      city: "Los Angeles",
      address: "456 Style Street, Los Angeles, CA 90210",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
    {
      city: "London",
      address: "789 Fashion Lane, London, UK SW1A 1AA",
      phone: "+44 20 7123 4567",
      hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
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
              <Badge variant="secondary" className="mb-4">Contact Us</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Get in{" "}
                <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, 
                we're here to help and connect with our community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={addToRefs} className="scroll-animate grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                      <method.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold mb-4">{method.value}</p>
                    <Button variant="outline" className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div ref={addToRefs} className="scroll-animate">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Send us a Message</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours. 
                  We're here to help with any questions or concerns you might have.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Response Time</h3>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Customer Support</h3>
                      <p className="text-muted-foreground">Available 7 days a week</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div ref={addToRefs} className="scroll-animate">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>
                      Tell us how we can help you today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={addToRefs} className="scroll-animate text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our products, shipping, and policies
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={addToRefs} className="scroll-animate text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Visit Our Stores</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience NOIR in person at one of our flagship locations
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card key={index}>
                  <div className="relative">
                    <img 
                      src={office.image} 
                      alt={`${office.city} Store`} 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4">Flagship Store</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{office.city}</CardTitle>
                    <CardDescription>{office.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{office.hours}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
