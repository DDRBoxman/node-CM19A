#include <v8.h>
#include <node.h>

using namespace node;
using namespace v8;

class CM19A: ObjectWrap
{
private:
	int m_count;
public:

static Persistent<FunctionTemplate> s_ct;

static void Init(Handle<Object> target)
{
	HandleScope scope;

	Local<FunctionTemplate> t = FunctionTemplate::New(New);

	s_ct = Persistent<FunctionTemplate>::New(t);
	s_ct->InstanceTemplate()->SetInternalFieldCount(1);
	s_ct->SetClassName(String::NewSymbol("CM19A"));

	NODE_SET_PROTOTYPE_METHOD(s_ct, "hello", Hello);

	target->Set(String::NewSymbol("CM19A"),
			                s_ct->GetFunction());
}

CM19A() :
	m_count(0)
{

}

~CM19A()
{
}

static Handle<Value> New(const Arguments& args)
{
	HandleScope scope;
	CM19A* hw = new CM19A();
        hw->Wrap(args.This());
	return args.This();
}

static Handle<Value> Hello(const Arguments& args)
{
	HandleScope scope;
	CM19A* hw = ObjectWrap::Unwrap<CM19A>(args.This());
	hw->m_count++;
	Local<String> result = String::New("Hello World");
	return scope.Close(result);
}

};


Persistent<FunctionTemplate> CM19A::s_ct;

extern "C" {
	static void init (Handle<Object> target)
	{
		CM19A::Init(target);
	}

	NODE_MODULE(cm19a, init);
}
