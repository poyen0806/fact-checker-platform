import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const handlePreview = async () => {
    if (!url) return;
    // 這裡可以使用 Open Graph API 或其他方式抓取 URL 預覽內容
    setPreview({
      title: "示例文章標題",
      description: "這是一個示例預覽描述，會根據網址動態更新。",
      image: "/placeholder.jpg", // 替換為動態抓取的圖片
    });
  };

  const handleSearch = () => {
    if (!url) return;
    router.push(`/result?query=${encodeURIComponent(url)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Fact Checker</h1>
      <div className="w-full max-w-xl space-y-4">
        <Input
          placeholder="貼上文章連結..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-4 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
        />
        <Button className="w-full p-4 bg-blue-600 text-white rounded-xl" onClick={handlePreview}>
          預覽文章
        </Button>
        {preview && (
          <Card className="mt-4 p-4 bg-white rounded-xl shadow-lg">
            {preview.image && (
              <Image src={preview.image} width={400} height={200} alt="預覽圖片" className="rounded-lg" />
            )}
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-900">{preview.title}</h2>
              <p className="text-gray-700 mt-2">{preview.description}</p>
            </CardContent>
          </Card>
        )}
        <Button className="w-full p-4 bg-green-600 text-white rounded-xl" onClick={handleSearch}>
          查證文章
        </Button>
      </div>
    </div>
  );
}
